import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Создаем директорию для сохранения файлов, если её нет
    const dataDir = path.join(process.cwd(), "data");
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, "forum_registrations.csv");
    const headers = ["Имя", "Email", "Телефон", "Комментарий", "Согласие", "Дата регистрации"];
    
    // Нормализуем данные для сравнения (приводим к нижнему регистру и убираем пробелы)
    const normalizeString = (str: string) => str.toLowerCase().trim();
    const normalizedName = normalizeString(data.name);
    const normalizedEmail = normalizeString(data.email);
    const normalizedPhone = normalizeString(data.phone);

    // Проверяем, существует ли файл и есть ли дубликаты
    if (existsSync(filePath)) {
      const existingContent = await readFile(filePath, "utf-8");
      const lines = existingContent.split("\n").filter(line => line.trim());
      
      // Пропускаем заголовок и BOM символ
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;
        
        // Парсим CSV строку (учитываем кавычки)
        const values: string[] = [];
        let currentValue = "";
        let inQuotes = false;
        
        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            values.push(currentValue.trim());
            currentValue = "";
          } else {
            currentValue += char;
          }
        }
        values.push(currentValue.trim());
        
        // Проверяем совпадение по имени, email и телефону (первые 3 колонки)
        if (values.length >= 3) {
          const existingName = normalizeString(values[0].replace(/^"|"$/g, ""));
          const existingEmail = normalizeString(values[1].replace(/^"|"$/g, ""));
          const existingPhone = normalizeString(values[2].replace(/^"|"$/g, ""));
          
          if (
            existingName === normalizedName &&
            existingEmail === normalizedEmail &&
            existingPhone === normalizedPhone
          ) {
            return NextResponse.json(
              { 
                success: false, 
                message: "Пользователь с такими данными уже зарегистрирован" 
              },
              { status: 409 }
            );
          }
        }
      }
    }
    
    const date = new Date().toLocaleString("ru-RU");
    const consent = data.consent ? "Да" : "Нет";
    const comments = data.comments || "";
    
    const row = [
      `"${data.name}"`,
      `"${data.email}"`,
      `"${data.phone}"`,
      `"${comments}"`,
      `"${consent}"`,
      `"${date}"`,
    ];

    let csvContent = "";

    // Проверяем, существует ли файл
    if (existsSync(filePath)) {
      // Читаем существующий файл
      const existingContent = await readFile(filePath, "utf-8");
      csvContent = existingContent + "\n" + row.join(",");
    } else {
      // Создаем новый файл с заголовками
      csvContent = "\uFEFF" + headers.join(",") + "\n" + row.join(",");
    }

    // Сохраняем файл
    await writeFile(filePath, csvContent, "utf-8");

    return NextResponse.json(
      { success: true, message: "Регистрация успешно сохранена" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при сохранении регистрации:", error);
    return NextResponse.json(
      { success: false, message: "Ошибка при сохранении данных" },
      { status: 500 }
    );
  }
}
