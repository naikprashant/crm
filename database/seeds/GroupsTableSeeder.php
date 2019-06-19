<?php

use Illuminate\Database\Seeder;
use CRM\Group;

class GroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	Group::truncate();
			
			Group::Create(['name' => 'admin']);
			Group::Create(['name' => 'staff']);
			Group::Create(['name' => 'customer']);
    }
}
