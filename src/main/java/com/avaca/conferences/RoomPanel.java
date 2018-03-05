package com.avaca.conferences;


import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptReferenceHeaderItem;
import org.apache.wicket.markup.head.CssReferenceHeaderItem;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.request.resource.JavaScriptResourceReference;
import org.apache.wicket.request.resource.CssResourceReference;


public class RoomPanel extends Panel {

	private static final long serialVersionUID = 1L;

	public RoomPanel(String id, String roomName) {
		super(id);
		
		if(roomName==null)
			this.setVisible(false);
 
		final Label result = new Label("roomName", "Connected to '"+roomName+"'");
		add(result);
 
	}

	@Override
	public void renderHead(IHeaderResponse response) {		
		
		response.render(CssReferenceHeaderItem.forReference(new CssResourceReference(RoomPanel.class, "res/css/conference.css")));
		response.render(CssReferenceHeaderItem.forReference(new CssResourceReference(RoomPanel.class, "res/css/bootstrap.min.css")));
		response.render(CssReferenceHeaderItem.forReference(new CssResourceReference(RoomPanel.class, "res/css/normalize.min.css")));
		response.render(CssReferenceHeaderItem.forReference(new CssResourceReference(RoomPanel.class, "res/css/owl.carousel.css")));
		response.render(CssReferenceHeaderItem.forReference(new CssResourceReference(RoomPanel.class, "res/css/font-awesome.min.css")));
		
		response.render(JavaScriptReferenceHeaderItem.forReference(new JavaScriptResourceReference(RoomPanel.class, "res/js/jquery.min.js")));
		response.render(JavaScriptReferenceHeaderItem.forReference(new JavaScriptResourceReference(RoomPanel.class, "res/js/bootstrap.min.js")));
		response.render(JavaScriptReferenceHeaderItem.forReference(new JavaScriptResourceReference(RoomPanel.class, "res/js/simplewebrtclatest-v2.js")));
		response.render(JavaScriptReferenceHeaderItem.forReference(new JavaScriptResourceReference(RoomPanel.class, "res/js/jquery.mousewheel.min.js")));
		response.render(JavaScriptReferenceHeaderItem.forReference(new JavaScriptResourceReference(RoomPanel.class, "res/js/owl.carousel.js")));
		response.render(JavaScriptReferenceHeaderItem.forReference(new JavaScriptResourceReference(RoomPanel.class, "res/js/conference.js")));
		response.render(JavaScriptReferenceHeaderItem.forReference(new JavaScriptResourceReference(RoomPanel.class, "res/js/all.js")));
		
	}
}
