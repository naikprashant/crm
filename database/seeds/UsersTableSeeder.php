<?php

use Illuminate\Database\Seeder;
use CRM\User;
use CRM\Group;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
			
				$adminRole = Group::where('name','admin')->first();
				$staffRole = Group::where('name','staff')->first();
				$customerRole = Group::where('name','customer')->first();
				
				$admin = User::create([
					'name' => 'admin',
					'email' => 'admin@admin.com',
					'password' => bcrypt('admin')
				]);
			
				$staff = User::create([
					'name' => 'staff',
					'email' => 'staff@staff.com',
					'password' => bcrypt('staff')
				]);
			
				$customer = User::create([
					'name' => 'customer',
					'email' => 'customer@customer.com',
					'password' => bcrypt('customer')
				]);
				
				$admin->groups()->attach($adminRole);
				$staff->groups()->attach($staffRole);
				$customer->groups()->attach($customerRole);
    }
}
