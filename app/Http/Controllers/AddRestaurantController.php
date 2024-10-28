<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use App\Models\Restaurant;
use App\Models\Schedule;
use Carbon\Carbon;

class AddRestaurantController extends Controller
{
    public function add_restaurant(){
       if(!Session::get('isLoggedIn')){
        return redirect('/login');
       }else{
        $year = Date('Y');
        return view('User.add_restaurant',  compact('year') );
       }
        
    }
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            // Validate the incoming request data
            $validatedData = $request->validate([
                'restaurantName' => 'required|string|max:255',
                'openingSchedule' => 'required|array',
                'openingSchedule.*.day' => 'required|string|max:3',
                'openingSchedule.*.open' => 'required|string',
                'openingSchedule.*.close' => 'required|string',
            ]);

            // Create the Restaurant
            $restaurant = Restaurant::create(['name' => $validatedData['restaurantName']]);

            // Process each schedule entry and save to the schedules table
            foreach ($validatedData['openingSchedule'] as $schedule) {
                $openAtMinutes = self::timeToMinutes($schedule['open']);
                $closeAtMinutes = self::timeToMinutes($schedule['close']);

                // Check if the opening time is greater than the closing time
                if ($openAtMinutes > $closeAtMinutes) {
                    $closeAtMinutes += 1440; // Add 1440 minutes (24 hours) for overnight schedules
                }

                Schedule::create([
                    'restaurantId' => $restaurant->id,
                    'day' => $schedule['day'],
                    'openAt' => $openAtMinutes,
                    'closeAt' => $closeAtMinutes,
                ]);
            }

            DB::commit();

            return response()->json(['message' => 'Restaurant and schedules created successfully'], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to create restaurant and schedules', 'details' => $e->getMessage()], 500);
        }
    }
    public static function timeToMinutes($time)
    {
        list($hours, $minutes) = explode(':', $time);
        return ($hours * 60) + $minutes;
    }
}