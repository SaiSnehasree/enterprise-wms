package com.sneha.wms.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;

import com.google.zxing.client.j2se
        .MatrixToImageWriter;

import com.google.zxing.common
        .BitMatrix;

import com.google.zxing.qrcode
        .QRCodeWriter;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.FileSystems;
import java.nio.file.Path;

@Service
public class BarcodeService {

    public String
    generateQRCode(
            String sku
    )
            throws WriterException,
            IOException {

        QRCodeWriter
                qrCodeWriter =
                new QRCodeWriter();

        BitMatrix bitMatrix =
                qrCodeWriter.encode(
                        sku,
                        BarcodeFormat.QR_CODE,
                        300,
                        300
                );

        // Create folder if not exists
        Path folderPath =
                FileSystems
                        .getDefault()
                        .getPath(
                                "generated-qrcodes"
                        );

        if (!Files.exists(
                folderPath
        )) {

            Files.createDirectories(
                    folderPath
            );
        }

        String filePath =
                "generated-qrcodes/"
                        + sku
                        + ".png";

        Path path =
                FileSystems
                        .getDefault()
                        .getPath(
                                filePath
                        );

        MatrixToImageWriter
                .writeToPath(
                        bitMatrix,
                        "PNG",
                        path
                );

        return filePath;
    }
}