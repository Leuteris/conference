package com.avaca.conferences;

import java.util.Arrays;
import java.util.List;

import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptReferenceHeaderItem;
import org.apache.wicket.markup.head.CssHeaderItem;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.form.DropDownChoice;
import org.apache.wicket.markup.html.form.Form;
import org.apache.wicket.markup.html.form.TextField;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.PropertyModel;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.apache.wicket.request.resource.JavaScriptResourceReference;
import org.apache.wicket.request.resource.CssResourceReference;

import com.avaca.conferences.instances.Room;
import com.avaca.conferences.validators.UsernameValidator;

public class RoomPanel extends Panel {

	private static final long serialVersionUID = 1L;
	private static final CssResourceReference boosrtap_CSS = new CssResourceReference(RoomPage.class, "bootstrap.min.css");
	private static final JavaScriptResourceReference jquery = new JavaScriptResourceReference(RoomPage.class, "jquery.min.js");
	private static final JavaScriptResourceReference boosrtap_JS = new JavaScriptResourceReference(RoomPage.class, "bootstrap.min.js");
	private static final CssResourceReference conference_CSS =  new CssResourceReference(RoomPage.class, "conference.css");
	private static final JavaScriptResourceReference webrtc_JS = new JavaScriptResourceReference(RoomPage.class, "simplewebrtclatest-v2.js");
	private static final JavaScriptResourceReference conference_JS = new JavaScriptResourceReference(RoomPage.class, "conference.js");

	

	public RoomPanel(String id, String roomName) {
		super(id);
		
		if(roomName==null)
			this.setVisible(false);
 
		final Label result = new Label("roomName", "Connected to '"+roomName+"'");
		add(result);
 
	}

	@Override
	public void renderHead(IHeaderResponse response) {			
		 response.render(CssHeaderItem.forReference(boosrtap_CSS));
		 response.render(CssHeaderItem.forReference(conference_CSS));	
		 
		 response.render(JavaScriptReferenceHeaderItem.forReference(jquery));
		 response.render(JavaScriptReferenceHeaderItem.forReference(boosrtap_JS));  
	     response.render(JavaScriptReferenceHeaderItem.forReference(webrtc_JS)); 
	     response.render(JavaScriptReferenceHeaderItem.forReference(conference_JS));
	}
}
