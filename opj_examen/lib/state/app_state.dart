import 'package:flutter/foundation.dart';

/// État global de l'app — équivalent du store PWA.
class AppState extends ChangeNotifier {
  bool _onboardingDone = false;
  String _userName = '';
  String? _examDate;
  int _dailyGoal = 15;
  int _xp = 0;
  int _streak = 0;

  bool get onboardingDone => _onboardingDone;
  String get userName => _userName;
  String? get examDate => _examDate;
  int get dailyGoal => _dailyGoal;
  int get xp => _xp;
  int get streak => _streak;

  void completeOnboarding({
    required String name,
    required String? corps,
    required String? examDate,
    required int dailyGoal,
  }) {
    _userName = name;
    _examDate = examDate;
    _dailyGoal = dailyGoal;
    _onboardingDone = true;
    addXp(100);
    notifyListeners();
  }

  void addXp(int amount) {
    _xp += amount;
    notifyListeners();
  }

  void incrementStreak() {
    _streak++;
    notifyListeners();
  }

  void setExamDate(String? date) {
    _examDate = date;
    notifyListeners();
  }
}
