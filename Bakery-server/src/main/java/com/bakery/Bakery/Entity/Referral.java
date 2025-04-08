package com.bakery.Bakery.Entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Referral {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long referralId;

    @ManyToOne
    @JoinColumn(name = "referred_by")
    private Customer referredBy;

    @ManyToOne
    @JoinColumn(name = "referred_to")
    private Customer referredTo;

    @ManyToOne
    private BakeryShop bakery;

    private LocalDate referralDate;
    private Boolean rewardGiven;

    public Long getReferralId() {
        return referralId;
    }

    public void setReferralId(Long referralId) {
        this.referralId = referralId;
    }

    public Customer getReferredBy() {
        return referredBy;
    }

    public void setReferredBy(Customer referredBy) {
        this.referredBy = referredBy;
    }

    public Customer getReferredTo() {
        return referredTo;
    }

    public void setReferredTo(Customer referredTo) {
        this.referredTo = referredTo;
    }

    public BakeryShop getBakery() {
        return bakery;
    }

    public void setBakery(BakeryShop bakery) {
        this.bakery = bakery;
    }

    public LocalDate getReferralDate() {
        return referralDate;
    }

    public void setReferralDate(LocalDate referralDate) {
        this.referralDate = referralDate;
    }

    public Boolean getRewardGiven() {
        return rewardGiven;
    }

    public void setRewardGiven(Boolean rewardGiven) {
        this.rewardGiven = rewardGiven;
    }
}
