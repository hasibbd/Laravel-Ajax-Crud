<?php
namespace App\Http\Controllers;
use App\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function getIndex()
    {
        return view('contact');
    }
    public function getData()
    {
        $contacts = Contact::all();
        return response()->json($contacts);
    }

    public function Store(Request $request){
        $users = new Contact();
        $users->name = $request->input('name');
        $users->email = $request->input('email');
        $users->phone = $request->input('phone');
        $users->save();
       // $contacts = Contact::all();
        return response()->json($users);
    }
    public function Delete($id){
        $contacts = Contact::destroy($id);
        return response()->json($contacts);
    }
    public function Get4Update($id){
        $contact = Contact::find($id);
        return response()->json($contact);
    }
    public function Update(Request $request, $id){
        $users = Contact::find($id);
        $users->name = $request->input('name');
        $users->email = $request->input('email');
        $users->phone = $request->input('phone');
        $users->save();
        return response()->json($users);
    }
}
