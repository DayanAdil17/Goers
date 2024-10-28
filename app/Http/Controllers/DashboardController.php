<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use App\Models\Restaurant;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function filterRestaurants(Request $request)
    {
        if(!Session::get('isLoggedIn')){
            return redirect('/login');
        }else{
            $name = $request->input('name');
        $day = $request->input('day');
        $time = $request->input('time');
        
        // Convert time to minutes if provided
        $timeInMinutes = $time ? $this->timeToMinutes($time) : null;

        // Query to fetch restaurants with filtered schedules
        $query = Restaurant::query()
            ->select('restaurants.id', 'restaurants.name', 'schedules.day', 'schedules.openAt', 'schedules.closeAt')
            ->join('schedules', 'restaurants.id', '=', 'schedules.restaurantId');

        // Filter by restaurant name if provided
        if ($name) {
            $query->where('restaurants.name', 'LIKE', "%$name%");
        }

        // Filter by opening day if provided
        if ($day) {
            $query->where('schedules.day', $day);
        }

        // Filter by opening time if provided
        if ($timeInMinutes !== null) {
            $query->where('schedules.openAt', '<=', $timeInMinutes)
                  ->where('schedules.closeAt', '>=', $timeInMinutes);
        }

        // Fetch the raw data
        $restaurants = $query->get();

        // Group schedules by restaurant ID and format the response
        $formattedResponse = [];
        foreach ($restaurants as $restaurant) {
            // Check if the restaurant already exists in the response array
            $existingRestaurant = collect($formattedResponse)->firstWhere('id', $restaurant->id);

            // Prepare the schedule entry
            $schedule = [
                'day' => $restaurant->day,
                'open' => $restaurant->openAt,
                'close' => $restaurant->closeAt,
            ];

            if ($existingRestaurant) {
                // Add the schedule to the existing restaurant entry
                $existingRestaurant['openSchedule'][] = $schedule;
            } else {
                // Add a new restaurant entry with its schedule
                $formattedResponse[] = [
                    'id' => $restaurant->id,
                    'name' => $restaurant->name,
                    'openSchedule' => [$schedule],
                ];
            }
        }

        return response()->json(array_values($formattedResponse), 200);
        }
    }
    private function timeToMinutes($time)
    {
        list($hours, $minutes) = explode(':', $time);
        return ($hours * 60) + $minutes;
    }

    public function dashboard(){
       
        $year = Date('Y');
        $userName = Session::get('userName');
        return view('User.dashboard',  compact('year', 'userDatabase') );
        
    }
}