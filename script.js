function importJS() {
    var scripts;
    scripts =
        [
            // script start------------------------------
            // view
            'script/view_tasks.js'
            // script end------------------------------
        ]
    ;
    for (var i=0; i<scripts.length; i++) {
        var str=
            '<script type="text/javascript" src="'
            +scripts[i]
            +'"'
            +' defer="defer"'
            +'><\/script>';
        document.write(
            str
        );
    }
}

$( document ).ready(function() {
    setTimeout(importJS, 0);
});

