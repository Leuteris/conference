package com.avaca.conferences.instances;

public class Room {

	String name;

	public Room(String name) {
		super();
		this.name = name;
	}
	
	@Override
	public String toString(){
		return name;	
	}
}
