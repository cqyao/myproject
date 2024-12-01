<?php

namespace App\Controllers;

use SilverStripe\CMS\Controllers\ContentController;
use SilverStripe\Control\HTTPRequest;
use App\Model\Venue;

class VenueController extends ContentController {
  private static $allowed_actions = ['getVenues'];

  public function getVenues(HTTPRequest $request)
  {
    $venues = Venue::get();

    $venueData = $venues->map('ID', function ($venue) {
      return [
        'ID' => $venue->ID,
        'Title' => $venue->Title,
        'Address' => $venue->Address,
        'Capacity' => $venue->Capacity,
        'Description' => $venue->Description,
      ];
    })->toArray();

    return json_encode(array_values($venueData));
  }
}