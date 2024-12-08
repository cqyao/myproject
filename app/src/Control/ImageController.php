<?php
// app/src/Control/ImageController.php
namespace App\Control;

use SilverStripe\Control\Controller;
use SilverStripe\Control\HTTPRequest;
use App\Model\Image;

class ImageController extends Controller
{
  private static $allowed_actions = [
    'getURL',
  ];

  public function getURL(HTTPRequest $request)
  {
    $v_name = $request->getVar('param');

    $images = Image::get()->filter(['Venue_name' => $v_name]);
    $imagesLinks = [];

    foreach ($images as $image) {
      $imagesLinks[] = [
        'Venue_Name' => $image->Venue_Name,
        'Image_URL' => $image->Image_URL,
      ];
    }

    return json_encode($imagesLinks);
  }
}