/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('contain non-empty string URL property value', function() {
            allFeeds.forEach(function(feed) {
                expect(typeof feed.url).toBe('string');
                expect(feed.url).not.toBe('');
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('contain non-empty string name property value', function() {
            allFeeds.forEach(function(feed) {
                expect(typeof feed.name).toBe('string');
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            var body = $('body');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('\'s visibility changes when clicked', function() {
            var body = $('body'),
                menuIcon = $('.menu-icon-link'),
                startVisibility = body.hasClass('menu-hidden');

            // click menu
            menuIcon.click();

            // check if visibility changed as click was triggered
            expect(body.hasClass('menu-hidden')).not.toBe(startVisibility);

            // click menu again
            menuIcon.click();

            // check if starting visibility was reverted
            expect(body.hasClass('menu-hidden')).toBe(startVisibility);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('load at least one entry', function(done) {
            var entries = $('.feed .entry');
            expect(entries.length).not.toBe(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var startId = 0,
            endId = 1,
            startContent,
            endContent;

        // get starting .feed content for startId
        beforeEach(function(done) {
            loadFeed(startId, function() {
                startContent = $('.feed').html();
                done();
            });
        });

        // check if content changed when Id changed
        it('\'s content changes when a new feed is loaded', function(done) {
            loadFeed(endId, function() {
                endContent = $('.feed').html();
                expect(endContent).not.toBe(startContent);
                done();
            });
        });
    });
}());
