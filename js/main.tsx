///<reference path="../typings/react/react-global.d.ts" />
///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path='./Converter.tsx'/>

$(window).ready(function() {
  ReactDOM.render(<Converter/>, $(".converter")[0]);
});
