import * as bootstrap from 'bootstrap';
import * as jquery from 'jquery';
import '../scss/main.scss'
import '../scss/output.css'

jquery(document).ready(function() {
        jquery("h1").click(function() {
                console.log("clicked ");
        });
});
