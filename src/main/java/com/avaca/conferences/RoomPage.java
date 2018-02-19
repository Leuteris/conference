package com.avaca.conferences;

import org.apache.wicket.Component;
import org.apache.wicket.markup.head.CssHeaderItem;
import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptReferenceHeaderItem;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.apache.wicket.request.resource.CssResourceReference;
import org.apache.wicket.request.resource.JavaScriptResourceReference;
import org.apache.wicket.util.string.StringValue;

public class RoomPage extends WebPage{
	
	private EnterRoomPanel enterRoomPanel;
	private Component roomPanel;
	

	
	public RoomPage(PageParameters parameters) {
	 
		String roomName = parameters.get("roomName").toString();
		
 
		add(enterRoomPanel = new EnterRoomPanel("enterRoom", roomName));
	 
		add(roomPanel = new RoomPanel("room",  enterRoomPanel.getSelectedRoom()));
	 
		
		/*if(parameters.isEmpty()) {
			roomPanel.setVisible(false);
		}*/
	}

}
