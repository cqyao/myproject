<?php
// app/src/Control/VenueController.php
namespace App\Control;

use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use App\Model\Venue;

class VenueController extends Controller
{
  private static $allowed_actions = [
    'getVenue',
  ];

  public function getVenue(HTTPRequest $request)
  {
    $venues = Venue::get();
    $venueDetails = [];

    foreach ($venues as $venue) {
      $venueDetails[] = [
        'Title' => $venue->Title,
        'Address' => $venue->Address,
        'Postcode' => $venue->Postcode,
        'Capacity' => $venue->Capacity,
        'Description' => $venue->Description,
        'Region' => $venue->Region
    ];
    }

    return json_encode($venueDetails);
  }
}