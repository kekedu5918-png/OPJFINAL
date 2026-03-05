# OPJ Examen — Flutter

Application Flutter pour la préparation à l'examen technique d'aptitude à la qualification OPJ (Police Nationale & Gendarmerie). Même charte graphique et parcours que la PWA (splash, onboarding, home).

## Prérequis

- [Flutter SDK](https://docs.flutter.dev/get-started/install) (stable, SDK ^3.5)

## Premier lancement

1. **Ajouter les dossiers plateformes** (une seule fois) :
   ```bash
   cd opj_examen
   flutter create .
   ```
   Cela ajoute `android/`, `ios/`, `web/`, `windows/`, etc. sans modifier ton code.

2. **Récupérer les dépendances** :
   ```bash
   flutter pub get
   ```

3. **Lancer l'app** :
   ```bash
   flutter run
   ```
   Choisis une cible (Chrome, Windows, Android, etc.) avec `flutter run -d chrome` ou `flutter run -d windows` si besoin.

## Structure

- `lib/main.dart` — point d'entrée, thème système, Provider
- `lib/app.dart` — routes (splash → onboarding ou home)
- `lib/theme/app_theme.dart` — couleurs "Uniforme de gala" (navy + or), polices Syne / DM Sans
- `lib/state/app_state.dart` — état global (onboarding, XP, streak, objectif)
- `lib/screens/` — SplashScreen, OnboardingScreen (5 étapes), HomeScreen

## Évolutions possibles

- Écrans QCM et Infractions (réutiliser la logique et les données de la PWA)
- Persistance (shared_preferences / hive) pour `AppState`
- Notifications locales pour rappels de révision
