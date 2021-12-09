import $ from "jquery";

window.$ = window.jQuery = require('jquery');

import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/js/dist/carousel';
import Glide, { Controls, Breakpoints }  from '@glidejs/glide/dist/glide.modular.esm';

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {faSearch, faCircle} from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faCircle);

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
dom.watch()


$(document).ready(() => {

    $(window).on("load resize scroll",function(e){

    });
});
