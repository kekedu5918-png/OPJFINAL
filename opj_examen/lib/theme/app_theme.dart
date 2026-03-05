import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// Charte graphique OPJ Examen — "Uniforme de gala"
/// Navy profond + or + blanc. Variables alignées avec la PWA.
class AppTheme {
  AppTheme._();

  // Surfaces
  static const Color bgDeepest = Color(0xFF04090F);
  static const Color bgBase = Color(0xFF080F1A);
  static const Color bgRaised = Color(0xFF0D1829);
  static const Color bgOverlay = Color(0xFF122035);
  static const Color bgHover = Color(0xFF1A2D47);
  static const Color border = Color(0xFF1E3354);
  static const Color borderMid = Color(0xFF2A4570);

  // Or
  static const Color gold = Color(0xFFF5A623);
  static const Color goldBright = Color(0xFFFFB93E);
  static const Color goldDim = Color(0xFFC47F0F);

  // Texte
  static const Color textPrimary = Color(0xFFEDF2F7);
  static const Color textSecondary = Color(0xFF94A3B8);
  static const Color textMuted = Color(0xFF4A6080);

  // Sémantique
  static const Color success = Color(0xFF34D399);
  static const Color error = Color(0xFFF87171);
  static const Color warning = Color(0xFFFBBF24);
  static const Color eliminating = Color(0xFFEF4444);

  static ThemeData get dark {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: bgBase,
      colorScheme: const ColorScheme.dark(
        primary: gold,
        onPrimary: bgBase,
        surface: bgRaised,
        onSurface: textPrimary,
        error: error,
        onError: Colors.white,
      ),
      textTheme: _buildTextTheme(),
      appBarTheme: AppBarTheme(
        backgroundColor: bgBase,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: GoogleFonts.syne(
          fontSize: 20,
          fontWeight: FontWeight.w800,
          color: gold,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: gold,
          foregroundColor: bgBase,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          textStyle: GoogleFonts.syne(fontWeight: FontWeight.w600, fontSize: 16),
        ),
      ),
      cardTheme: CardTheme(
        color: bgRaised,
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: bgOverlay,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: gold, width: 2),
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        hintStyle: const TextStyle(color: textMuted),
      ),
    );
  }

  static TextTheme _buildTextTheme() {
    return TextTheme(
      displayLarge: GoogleFonts.syne(fontSize: 38, fontWeight: FontWeight.w700, color: textPrimary),
      displayMedium: GoogleFonts.syne(fontSize: 30, fontWeight: FontWeight.w700, color: textPrimary),
      headlineLarge: GoogleFonts.syne(fontSize: 24, fontWeight: FontWeight.w700, color: textPrimary),
      headlineMedium: GoogleFonts.syne(fontSize: 20, fontWeight: FontWeight.w700, color: textPrimary),
      titleLarge: GoogleFonts.syne(fontSize: 17, fontWeight: FontWeight.w600, color: textPrimary),
      titleMedium: GoogleFonts.dmSans(fontSize: 15, fontWeight: FontWeight.w500, color: textPrimary),
      bodyLarge: GoogleFonts.dmSans(fontSize: 15, height: 1.6, color: textPrimary),
      bodyMedium: GoogleFonts.dmSans(fontSize: 13, color: textSecondary),
      labelLarge: GoogleFonts.dmSans(fontSize: 15, fontWeight: FontWeight.w500),
    );
  }
}
