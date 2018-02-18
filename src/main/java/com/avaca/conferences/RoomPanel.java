package com.avaca.conferences;

import java.util.Arrays;
import java.util.List;

import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptReferenceHeaderItem;
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

import com.avaca.conferences.instances.Room;
import com.avaca.conferences.validators.UsernameValidator;

public class RoomPanel extends Panel {

	private static final long serialVersionUID = 1L;
	private static final JavaScriptResourceReference MYPAGE_JS = new JavaScriptResourceReference(RoomPage.class, "style.css");
	
	public RoomPanel(String id, String roomName) {
		super(id);
		
		if(roomName==null)
			this.setVisible(false);
 
		final Label result = new Label("roomName", "Connected to '"+roomName+"'");
		add(result);
 
	}

	@Override
	public void renderHead(IHeaderResponse response) {
	  response.render(JavaScriptReferenceHeaderItem.forReference(MYPAGE_JS));
	}
}
