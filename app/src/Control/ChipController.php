<?php
// app/src/Control/ChipController.php
namespace App\Control;

use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use App\Model\Chip;

class ChipController extends Controller
{
  private static $allowed_actions = [
    'getChips',
  ];

  public function getChips(HTTPRequest $request)
  {
    $v_name = $request->getVar('param');

    $allChips = Chip::get()->filter(['Venue_Name' => $v_name]);
    $chips = [];

    foreach ($allChips as $chip) {
      $chips[] = [
        'Venue_Name' => $chip->Venue_Name,
        'Chip_Description' => $chip->Chip_Description,
      ];
    }

    return json_encode($chips);
  }
}