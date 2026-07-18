package com.civicpulse.backend.complaint.dto;

import com.civicpulse.backend.complaint.entity.ComplaintStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateComplaintStatusRequest {

    private ComplaintStatus status;

}