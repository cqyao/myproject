<?php
// app/src/Model/Chip.php
namespace App\Model;

use SilverStripe\ORM\DataObject;

class Chip extends DataObject
{
    private static $table_name = 'Chip';

    private static $db = [
        'Venue_Name' => 'Text',
        'Chip_Description' => 'Text', 
    ];
}