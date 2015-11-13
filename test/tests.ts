var tests = [
  ];

var test;
for(i in tests) {
  test = tests[i];
  test(bash('Sun, 29 Feb 2004 16:21:42 -0800'),);
  test(bash('2004-02-29 16:21:42'),);
}
