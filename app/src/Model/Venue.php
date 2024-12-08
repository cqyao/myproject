<?php
// app/src/Model/Venue.php
namespace App\Model;

use SilverStripe\ORM\DataObject;

class Venue extends DataObject
{
    private static $table_name = 'Venue';

    private static $db = [
        'Title' => 'Text',
        'Address' => 'Text',
        'Postcode' => 'Varchar',
        'Capacity' => 'Int',
        'Description' => 'Text',
        'Region' => 'Text',
    ];
}