void main() {
  final binding = IntegrationTestWidgetsFlutterBinding.ensureInitialized() as IntegrationTestWidgetsFlutterBinding;

  testWidgets('Screenshot', (WidgetTester tester) async {
    app.main();

    await binding.convertFlutterSurfaceToImage();
    await tester.pumpAndSettle();
    await binding.takeScreenshot('screenshot-1');
  })
}