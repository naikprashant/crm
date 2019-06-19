<?php

namespace CRM;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
		protected $dateFormat = 'U';
    public function users()	{
			return $this->belongsToMany('CRM\User');
		}
}
