package com.wecp.financial_seminar_and_workshop_management.controller;



import com.wecp.financial_seminar_and_workshop_management.entity.Event;
import com.wecp.financial_seminar_and_workshop_management.entity.Feedback;
import com.wecp.financial_seminar_and_workshop_management.service.EventService;
import com.wecp.financial_seminar_and_workshop_management.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class ProfessionalController {

    @Autowired private EventService eventService;
    @Autowired private FeedbackService feedbackService;

    @GetMapping("/api/professional/events")
    public ResponseEntity<List<Event>> viewAssignedEvents(@RequestParam Long userId) {
        return ResponseEntity.ok(eventService.getForProfessional(userId));
    }

    @PutMapping("/api/professional/event/{id}/status")
    public ResponseEntity<Event> updateEventStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(eventService.updateStatus(id, status));
    }

    @PostMapping("/api/professional/event/{eventId}/feedback")
    public ResponseEntity<Feedback> provideFeedback(@PathVariable Long eventId,
                                                    @RequestParam Long userId,
                                                    @RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackService.addFeedback(userId, eventId, feedback));
    }
}