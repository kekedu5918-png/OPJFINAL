import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:opj_examen/theme/app_theme.dart';
import 'package:opj_examen/state/app_state.dart';

const int _totalSteps = 5;

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentStep = 0;
  String _name = '';
  String? _corps;
  String? _examDate;
  int _dailyGoal = 15;

  void _next() {
    if (_currentStep < _totalSteps - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 350),
        curve: Curves.easeInOut,
      );
      setState(() => _currentStep++);
    } else {
      context.read<AppState>().completeOnboarding(
            name: _name.isEmpty ? 'Candidat' : _name,
            corps: _corps,
            examDate: _examDate,
            dailyGoal: _dailyGoal,
          );
      Navigator.of(context).pushReplacementNamed('/home');
    }
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.bgBase,
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              child: Row(
                children: [
                  Text(
                    '$_currentStep / $_totalSteps',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: AppTheme.textMuted,
                        ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: (_currentStep + 1) / _totalSteps,
                        backgroundColor: AppTheme.bgOverlay,
                        valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.gold),
                        minHeight: 6,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Expanded(
              child: PageView(
                controller: _pageController,
                physics: const NeverScrollableScrollPhysics(),
                children: [
                  _buildStep1(),
                  _buildStep2(),
                  _buildStep3(),
                  _buildStep4(),
                  _buildStep5(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStep1() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(
              color: AppTheme.bgRaised,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppTheme.gold, width: 2),
            ),
            child: const Center(
              child: Text(
                'OPJ',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w800,
                  color: AppTheme.gold,
                ),
              ),
            ),
          ),
          const SizedBox(height: 32),
          Text(
            'Qualification OPJ.',
            style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                  color: AppTheme.textPrimary,
                  fontWeight: FontWeight.w800,
                ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 12),
          Text(
            "L'examen le plus technique de la Police.\nOn va te préparer comme les meilleurs.",
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: AppTheme.textSecondary,
                ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 40),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: _next,
              child: const Text('Accepter la mission →'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStep2() {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 24),
          Text(
            'Ton prénom',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: AppTheme.textSecondary,
                ),
          ),
          const SizedBox(height: 8),
          TextField(
            onChanged: (v) => setState(() => _name = v),
            decoration: const InputDecoration(
              hintText: 'Ton prénom',
            ),
          ),
          const SizedBox(height: 24),
          Text(
            'Ton corps',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  color: AppTheme.textSecondary,
                ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: _CorpsCard(
                  emoji: '🚓',
                  label: 'Police Nationale',
                  selected: _corps == 'PN',
                  onTap: () => setState(() => _corps = 'PN'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _CorpsCard(
                  emoji: '🎖️',
                  label: 'Gendarmerie',
                  selected: _corps == 'GN',
                  onTap: () => setState(() => _corps = 'GN'),
                ),
              ),
            ],
          ),
          const SizedBox(height: 40),
          ElevatedButton(onPressed: _next, child: const Text('Continuer →')),
        ],
      ),
    );
  }

  Widget _buildStep3() {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: 24),
          Text(
            'Quand est ton examen ?',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: AppTheme.textPrimary,
                ),
          ),
          const SizedBox(height: 20),
          OutlinedButton.icon(
            onPressed: () async {
              final date = await showDatePicker(
                context: context,
                initialDate: DateTime.now().add(const Duration(days: 60)),
                firstDate: DateTime.now(),
                lastDate: DateTime.now().add(const Duration(days: 365)),
              );
              if (date != null) {
                setState(() => _examDate =
                    '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}');
              }
            },
            icon: const Icon(Icons.calendar_today, size: 20, color: AppTheme.gold),
            label: Text(
              _examDate ?? 'Choisir une date',
              style: TextStyle(
                color: _examDate != null ? AppTheme.textPrimary : AppTheme.textMuted,
              ),
            ),
            style: OutlinedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 16),
              side: const BorderSide(color: AppTheme.borderMid),
              foregroundColor: AppTheme.gold,
            ),
          ),
          const SizedBox(height: 40),
          ElevatedButton(onPressed: _next, child: const Text("C'est noté →")),
        ],
      ),
    );
  }

  Widget _buildStep4() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            "Objectif quotidien",
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  color: AppTheme.textPrimary,
                ),
          ),
          const SizedBox(height: 8),
          Text(
            'Combien de questions par jour ?',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: AppTheme.textSecondary,
                ),
          ),
          const SizedBox(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [5, 15, 30].map((n) {
              final selected = _dailyGoal == n;
              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8),
                child: ChoiceChip(
                  label: Text('$n/j'),
                  selected: selected,
                  onSelected: (_) => setState(() => _dailyGoal = n),
                  selectedColor: AppTheme.gold,
                  labelStyle: TextStyle(
                    color: selected ? AppTheme.bgBase : AppTheme.textPrimary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: 40),
          ElevatedButton(onPressed: _next, child: const Text('Valider →')),
        ],
      ),
    );
  }

  Widget _buildStep5() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.verified_user, size: 64, color: AppTheme.gold),
          const SizedBox(height: 24),
          Text(
            'Mission acceptée.',
            style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  color: AppTheme.gold,
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 12),
          Text(
            '+100 XP débloqués.',
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: AppTheme.textSecondary,
                ),
          ),
          const SizedBox(height: 40),
          ElevatedButton(
            onPressed: _next,
            child: const Text('C\'est parti →'),
          ),
        ],
      ),
    );
  }
}

class _CorpsCard extends StatelessWidget {
  final String emoji;
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _CorpsCard({
    required this.emoji,
    required this.label,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: selected ? AppTheme.gold.withValues(alpha: 0.2) : AppTheme.bgRaised,
      borderRadius: BorderRadius.circular(16),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 12),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: selected ? AppTheme.gold : AppTheme.border,
              width: selected ? 2 : 1,
            ),
          ),
          child: Column(
            children: [
              Text(emoji, style: const TextStyle(fontSize: 28)),
              const SizedBox(height: 8),
              Text(
                label,
                style: Theme.of(context).textTheme.titleSmall?.copyWith(
                      color: selected ? AppTheme.gold : AppTheme.textPrimary,
                      fontWeight: FontWeight.w600,
                    ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
