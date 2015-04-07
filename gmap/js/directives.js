/**
 * Created by jason on 4/6/15.
 * Copied the upload code for the file from http://plnkr.co/edit/eeQbR65oE8iljm7ueGhX?p=preview
 */
gMapApp.directive('fileReader', function() {
    return {
        scope: {
            fileReader:"="
        },
        link: function(scope, element) {
            $(element).on('change', function(changeEvent) {
                var files = changeEvent.target.files;
                if (files.length) {
                    var r = new FileReader();
                    r.onload = function(e) {
                        var contents = e.target.result;
                        scope.$apply(function () {
                            scope.fileReader = contents;
                        });
                    };

                    r.readAsText(files[0]);
                }
            });
        }
    };
});