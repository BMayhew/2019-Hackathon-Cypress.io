# My submission to the Applitools Hackathon 2019

## Choosing Cypress

I'm typically a Ruby guy, using Watir / PageObject Gem to run my UI automated tests. When I saw the hackathon didn't have Ruby as an available option, I decided this would be a good time to learn Cypress. There are a few teams in my org using it already, and this allowed me to get familiar with it.

## Running the suite

* Downlaod the repo: `git clone https://github.com/BMayhew/2019-Hackathon-Cypress.io.git`

* From the directory run: `npm install`

* To open cypress: `npx cypress open`

* Click on TraditionalTests.js to run. This will open a chrome window and run the test suite first against the V1 url and then againts the V2 url. All failures should be avialable via cypress tool. My tests were not specific enough to catch every single styling change, though it did catch quite a few defects. 

* To run the Visual Tests click on ApplitoolsTests.js. This will open Chrome and run the test suite against V2 by default. If you want to point the Visual Tests at the V1 url, just uncomment `//const urls = ["/hackathon.html"];` within the test file. Make sure to comment out the V2 const.

# 5 Main Tasks To Automate

## Hackathon Sites

* [Version 1](https://demo.applitools.com/hackathon.html)
* [Version 2](https://demo.applitools.com/hackathonV2.html)

Below are the five tests you need to write.

## Login Page UI Elements Test

1. Open the login page and write assertions to ensure everything looks OK on that page. i.e. add assertions to ensure all the fields, labels and all other items exist.

Notes:

* In the traditional approach, if you can’t test this or any other test, please write an empty test with a comment explaining your reason. For the visual testing suite, when you run the same test against V2, you’ll see differences. Mark bugs in the Applitools dashboard using the "Bug regions" feature and save the test as a failure.
* If you are confused about some part of the difference and not know if that’s a bug or a feature, in the real world, you’ll add a "Remark" region to collaborate with the development team and ask questions. In this hackathon, create a Remark region in the Applitools dashboard for any differences you’re not sure about.

## Data-Driven Test

2. Test the following login functionality by entering different values to username and password fields.
    * If you don’t enter the username and password and click the login button, it should throw an error
    * If you only enter the username and click the login button, it should throw an error
    * If you only enter the password and click the login button, it should throw an error
    * If you enter both username (any value) and password (any value), it should log you in.

Notes:

* For the visual testing suite, to test functionality (functional testing), you simply need to use Applitools to take a screenshot after the functionality is done (i.e. the end-state of the feature) to verify.
* You will need to use the Batching feature to group multiple tests into a single suite/batch.
* When you use eyes.open, give different test names (with numbers or something dynamic) so that Applitools can create four new screenshot (baselines) for each of the 4 sub tests instead of overriding each screenshot with the next sub-test’s screenshot and creating just one baseline.

## Table Sort Test

3. Once logged in (use any username and password to login), view the Recent Transactions table. Your test should click on the "Amounts" header, and verify that the column is in ascending order and that each row’s data stayed in tact after the sorting.

Notes:
For the visual testing suite, if your viewport is too small and you see a scrollbar, you need to use Applitools "Full page screenshot" to capture a screenshot of the entire window. Alternatively, you may try increasing the viewport size to avoid this.

## Canvas Chart Test

4. Once logged in, click on the "Compare Expenses" button on the toolbar. This will display a bar chart comparing the expenses for the year 2017 and 2018. Assume the values of the chart are coming from a test data and the test data will not change across versions. Validate that the bar chart and representing that data (number of bars and their heights). They should remain the same across versions. Then click on the "Show data for next year" button. This should add the data for the year 2019. Verify that this data set is added for the year 2019.

## Dynamic Content Test

5. Test for the existence of a display ad that’s dynamic and at times might go missing by using this URL: https://demo.applitools.com/hackathon.html?showAd=true. Log in by entering any username and password. Once logged in, you should see two different "Flash sale" gifs. Make sure both gifs exists.

Notes:

* When you run the same test with the V2 version of the app https://demo.applitools.com/hackathonV2.html?showAd=true, one of the gifs won’t be displayed and the other will be a different gif (because ads can change). Your tests need to be smart enough to find the missing gif (bug) and also beware of the different gif (feature). For the visual test, It’s recommended that you use a Layout region annotation.

* When you take a screenshot of a page with dynamic content. It’ll constantly change so can’t create a baseline. If you use the "Ignore region", then you can create a baseline. However, you won’t know if the dynamic content goes completely missing. That’s where the "Layout Region" comes in. It’s like an ignore region but doesn’t completely ignore the contents in the region. It only ignore as long as there is some content and structure(or the layout) remains the same but fails if dynamic region is blank.