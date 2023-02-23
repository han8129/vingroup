import * as bootstrap from 'bootstrap';
import * as jquery from 'jquery';
import '../scss/tailwindcss.scss'
import '../scss/main.scss'

jquery(document).ready(function() {
        jquery("h1").click(function() {
                console.log("clicked ");
        });
});
