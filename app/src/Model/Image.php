<?php
// app/src/Model/Image.php
namespace App\Model;

use SilverStripe\ORM\DataObject;

class Image extends DataObject
{
    private static $table_name = 'Images';

    private static $db = [
        'Venue_Name'=> 'Text',
        'Image_URL' => 'Text'
    ];
}