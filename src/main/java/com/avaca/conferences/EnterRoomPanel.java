package com.avaca.conferences;

import java.util.Arrays;
import java.util.List;

import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.request.mapper.parameter.PageParameters;

import com.avaca.conferences.instances.Room;
import com.avaca.conferences.validators.UsernameValidator;

public class EnterRoomPanel extends Panel {

	private static final long serialVersionUID = 1L;
	private final List<String> rooms = Arrays.asList(new String[] { new Room("Room1").toString(), new Room("Room2").toString(), 
																	new Room("Room3").toString(), new Room("Room4").toString() });
	private String selected = "Room1";
	private String selectedRoom = null;
	private IModel<String> dropdownModel = new PropertyModel<String>(this, "selected");

	public EnterRoomPanel(String id, String roomName) {
		super(id);

		if(rooms.contains(roomName))
		{
			this.setVisible(false);
			selectedRoom = roomName;
		}	

		DropDownChoice<String> listRooms = new DropDownChoice<String>("rooms", dropdownModel, rooms);
		listRooms.setRequired(true);

		Form<?> form = new Form<Void>("form") {

			@Override
			protected void onSubmit() {

				final String selectedRoom = dropdownModel.getObject();

				PageParameters pageParameters = new PageParameters();

				pageParameters.add("roomName", selectedRoom);
				setResponsePage(RoomPage.class, pageParameters);

			}

		};

		add(form);
		form.add(listRooms);

	}
	
	public String getSelectedRoom() {
		return selectedRoom;
		
	}

}
