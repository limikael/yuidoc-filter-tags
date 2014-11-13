yuidoc-filter-tags
==================

Preprocessor for yuidoc that makes it possible to filter out parts of the documentation.

In order to include only items that contain certain tags, make your yuidoc config looks something like this:

````
{
    "options": {
        "preprocessor": "yuidoc-filter-tags",
        "include-only-tags": "mytag"
    }
}
````

In order to include everything, except items that contain a certain tag, make it look like:

````
{
    "options": {
        "preprocessor": "yuidoc-filter-tags",
        "dont-include-tags": "mytag"
    }
}
````
