import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:opj_examen/theme/app_theme.dart';
import 'package:opj_examen/screens/splash_screen.dart';
import 'package:opj_examen/screens/onboarding_screen.dart';
import 'package:opj_examen/screens/home_screen.dart';
import 'package:opj_examen/state/app_state.dart';

class OpjExamenApp extends StatelessWidget {
  const OpjExamenApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'OPJ Examen',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.dark,
      initialRoute: '/',
      routes: {
        '/': (context) => const SplashScreen(),
        '/onboarding': (context) => const OnboardingScreen(),
        '/home': (context) => const HomeScreen(),
      },
    );
  }
}
