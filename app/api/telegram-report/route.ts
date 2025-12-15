import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import * as XLSX from "xlsx";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { success: false, message: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing" },
        { status: 500 }
      );
    }

    const filePath = path.join(process.cwd(), "data", "forum_registrations.csv");
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: "CSV file not found" },
        { status: 404 }
      );
    }

    const csvContent = await readFile(filePath, "utf-8");

    // Конвертируем CSV в XLSX
    const workbook = XLSX.read(csvContent, { type: "string" });
    const xlsxBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    const date = new Date().toLocaleDateString("ru-RU"); // формата DD.MM.YYYY
    const fileName = `registrations_${date}.xlsx`;

    const telegramUrl = `https://api.telegram.org/bot${token}/sendDocument`;
    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append(
      "document",
      new Blob([xlsxBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      fileName
    );

    const tgResponse = await fetch(telegramUrl, {
      method: "POST",
      body: formData,
    });

    if (!tgResponse.ok) {
      const errorText = await tgResponse.text();
      return NextResponse.json(
        { success: false, message: "Failed to send to Telegram", details: errorText },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: "CSV sent to Telegram chat" });
  } catch (error) {
    console.error("Telegram send error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

