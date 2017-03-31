<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Child context test(s)</title>
    <script src="./resources/testharness.js"></script>
   <!-- <script src="./resources/testharnessreport.js"></script>
   -->
  </head>
  <body>
    <div id="log"></div>
    <script>
        //test(function() {
        //    assert_true(document.implementation.hasFeature())
        //},"hasFeature() with no arguments")
        //test();

        //async_test(function(t) {
        //    document.addEventListener("DOMContentLoaded", function() {
        //        t.step(function() {
        //            assert_true(t.bubbles, "bubbles should be true");
        //        });
        //        t.done();
        //    });
        //},"DOMContentLoaded");

        //function foo() {
        //    return Promise.resolve("foo");
        //}
        //promise_test(function() {
        //    return foo()
        //        .then(function(result) {
        //            assert_equals(result, "foo", "foo should return 'foo'");
        //        });
        //},"simple example");

        //function bar() {
        //    return Promise.reject(new TypeError());
        //}
        //promise_test(function(t) {
        //    return promise_rejects(t, new TypeError(), bar());
        //}, "another example");

        //assert_equals(document.body, document.getElementsByTagName("body"[0]))
        //done()

        //test(function() {
        //    var element = document.createElement("div");
        //    element.setAttribute("id", "null");
        //    document.body.appendChild(element);
        //    this.add_cleanup(function() { document.body.removeChild(element)});
        //    assert_equals(document.getElementById(null), element);
        //}, "calling document.getElementById with a null argument.");

        //async_test(function(t) {
        //    var gotEvent = false;
        //    document.addEventListener("DOMContentLoaded", t.step_func(function() {
        //          assert_false(gotEvent, "Unexpected DOMContentLoaded event");
        //            gotEvent = true;
        //              t.step_timeout(function() { t.done(); }, 2000);
        //              });
        //    }, "Only one DOMContentLoaded");
//  generate_tests(assert_equals, [
//      ["sum one and one", 1+1, 2],
//      ["sum one and zero", 1+0, 1]
//  ])
//test(function() {
//  assert_equals(1+1, 2)
//}, "sum one and one");
//test(function() {
//  assert_equals(1+0, 1)
//}, "sum one and zero");
  test(function(t) {
    assert_true(true, "true is true")
  }, "simple test");
    </script>
  </body>
</html>
