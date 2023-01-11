# Exponet_Work_Samples

This repository contains examples of my work from my co-op placement at Exponet Canada during 2022. Descriptions of the samples are below.


TablePage

An internal application that I worked on at Exponet displayed several pages with information in table format. Previously, each page used its own code to produce largely the same result. TablePage was a generic object I wrote to provide the functionality these pages needed. I wrote it with two goals: reducing the number of times I was asked to solve a bug with a feature on some table on some page which had already been fixed on a different page, and reducing the amount of time it took to create new pages with a similar format. It proved successful in both regards, particularly the second. The code displayed here does not show the implementation, but only the comment at the top of the file which is meant to guide future developers through using it.


UnitTest and ExampleTest

The backend for an internal application that I worked on at Exponet had no automated testing, and I believed having a way to add tests would be useful for the long-term stability of the application. These files are the main parts of a quick first solution I put together in a few hours on a weekend early in my placement. They are meant to allow users to add new tests that can be run either individually or all in a row to verify that backed code runs successfully. I'm including them as an example of one way I can structure a feature's code to be clear and extensible. The code for these files was ultimately never included in the project, as it was decided that a framework for unit testing would be more flexible and offer more useful features. However, this code became surprisingly useful to the development team when manually testing and debugging backend code, and was often merged into testing branches to provide a way to cleanly run newly written or buggy code.
