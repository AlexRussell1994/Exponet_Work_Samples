
public abstract class UnitTest {

    public static ArrayList<UnitTest> getTests() {
        ArrayList<UnitTest> list = new ArrayList<UnitTest>();

        // add new unit tests here
        // list.add(new [yourTestHere]());
        list.add(new ExampleTest());

        return list;
    }

    private static ArrayList<UnitTest> tests = null;

    public static UnitTest getTest(String testName) {
        if (tests == null) {
            tests = getTests();
        }
        for (UnitTest test : tests) {
            if (Objects.equals(test.getName(), testName))
                return test.newTest();
        }
        return null;
    }

    protected UnitTest(String name) {
        this.name = name;
    }
    private final String name;
    public String getName() {return name;}

    public abstract UnitTest newTest();

    public abstract Map<String,String> run(def services);

}