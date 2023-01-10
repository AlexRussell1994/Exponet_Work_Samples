
class ExampleTest extends UnitTest { // Replace "ExampleTest"

    ExampleTest() { // Replace "ExampleTest"
        super("Test Name 1"); // test name must be unique to this subclass of UnitTest
    }

    @Override
    UnitTest newTest() {
        return new ExampleTest() // Replace "ExampleTest"
    }

    @Override
    Map<String,String> run(services) {
        String testOutput = ""
        boolean testPassed
        try {
        // unit test begins here



            // add unit test here
            // for example:
            testPassed = true
            testOutput = "A"



        // unit test ends here
        } catch (Exception e) {
            testPassed = false;
            testOutput += "\nError: " + e
        }
        Map<String,String> result = new HashMap<String,String>()
        if (testPassed)
            result.put("success", "true")
        else
            result.put("success", "false")
        result.put("output", testOutput)
        return result
    }
}

// remember to add your unit test to getTests() in UnitTest.groovy
// if you need to access any services you can add them to the "services" variable in UnitTestService.groovy


