<?php

namespace App\Http\Controllers;

use App\Models\Students;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Intervention\Image\ImageManagerStatic as Image;

class StudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = DB::table('students')->leftJoin('departments','students.department_id','departments.id')->select('students.*','departments.name')->get();
        return response()->json([
            "data" => $data,
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
            'f_name'=> 'requried|max:25',
            'l_name'=>'requried| max:25',
        ];
        // print_r($request);
        if($request->id != null){
            $student = Students::find($request->id);
        }
        else{
            $student = new Students();
        }
        $student->first_name = $request->f_name;
        if($request->department_id != null){
        $student->last_name = $request->l_name;
            $student->department_id = $request->department_id;
        };

        if($request->profile_img == null){
            // $student->save();
            $msg = "Data Added Sucessfuly";
        }
        else{
            if($student->profile_img != null && file_exists($student->profile_img)){
                unlink($student->profile_img);
            }
            $pos = strpos($request->profile_img, ';');
            $tmpStr = substr($request->profile_img,0,$pos);
            $extension = explode('/',$tmpStr)[1];
            $name = time().".".$extension;
            $fullPath = "assets/profile_img/" . $name;
            $img =  Image::make($request->profile_img)->resize(200, 200);
            $img->save($fullPath);
            $student->profile_img = $fullPath;
            $msg= "Store With Image";
        }
        
        $student->save();

        return response()->json([
            "status" => 200,
            "msg"=> $request->id,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Students  $students
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $result = Students::find($id);
        return response()->json([
            "status"=>200,
            "data"=> $result,
        ]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Students  $students
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $result = Students::find($id);
        if(file_exists($result->profile_img)){
            unlink($result->profile_img);
        }
        $result->delete();

        return response()->json([
            "status"=> 200,
            "msg"=> "Record Deleted successfuly",
        ]);
    }

    public function GetDisplayData()
    {
        $dataTmp = DB::table('students')
        ->leftJoin('departments','students.department_id','departments.id')
        ->select('students.*','departments.name')
        ->get();
        $data = $dataTmp->groupby('name');
        return response()->json($data);
    }
}
