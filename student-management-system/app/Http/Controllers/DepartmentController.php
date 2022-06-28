<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = Department::all();
        return response()->json([
            "data"=> $data,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validation = [
            "name"=> "requried|max:255"
        ];

        if($request->id != null){
            $department = Department::find($request->id);
        }
        else{
            $department = new Department();
        }
        $department->name = $request->name;
        $department->save();

        return response()->json([
            "status"=>200,
            "msg"=> "Department Register Successfuly"
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Department  $department
     * @return \Illuminate\Http\Response
     */
    public function show(Department $department)
    {
        //
        $data = Department::find($department->id);
        return response()->json([
            "status" => 200,
            "msg"=> "Data Found",
            "data"=> $data
        ]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Department  $department
     * @return \Illuminate\Http\Response
     */
    public function destroy(Department $department)
    {
        //
        $data = Department::find($department->id)->delete();
        return response()->json([
            "status" => 200,
            "msg"=> "Data Deleted",
        ]);    
    }
}
