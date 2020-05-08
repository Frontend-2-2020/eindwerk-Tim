import React, { Component } from "react";

export default class Sandbox extends Component {
  render() {
    var inputASCII = [
      "<pre><code>+--------+   +-------+    +-------+",
      "|        |   + ditaa +    |       |",
      "|  Text  |   +-------+    |diagram|",
      "|Document|   |!magic!|    |       |",
      "|        |   |       |    |       |",
      "+---+----+   +-------+    +-------+",
      "</code></pre>",
    ].join("\n");
    var wrappedASCII = { __html: inputASCII };
    return <span dangerouslySetInnerHTML={wrappedASCII}></span>;
  }
}
