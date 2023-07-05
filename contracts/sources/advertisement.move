module contract::advertisement {
    use sui::clock::{Self, Clock};
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::sui::{Self, SUI};

    /// Our address
    const OWNER_ADDRESS: address = @0x5b1a17a9f9baafdd4b956e95fd19d722e583caa7ad7a80bb5e27cf037b0e0182;

    /// Rate multiplier for the advertisement
    /// For now, the fee is duration_ms*RATE_MULTIPLIER
    /// Roughly 1.8 SUI for every hour
    const RATE_MULTIPLIER: u64 = 300;

    struct Advertisement has key, store {
        id: UID,
        creator: address,
        expires_ts: u64,
        balance: Balance<SUI>,
    }

    // Error codes
    const EInsufficientFee: u64 = 0;
    const EStillActive: u64 = 1;

    public entry fun create(
        duration_ms: u64,
        fee: Coin<SUI>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(coin::value(&fee) >= duration_ms * RATE_MULTIPLIER, EInsufficientFee);
        let creator = tx_context::sender(ctx);
        let id = object::new(ctx);
        transfer::public_share_object(
            Advertisement {
                id,
                creator,
                expires_ts: duration_ms + clock::timestamp_ms(clock),
                balance: coin::into_balance(fee),
            }
        );
    }

    public fun check_active(advertisement: &Advertisement, clock: &Clock): bool {
        advertisement.expires_ts > clock::timestamp_ms(clock)
    }

    public entry fun withdraw(advertisement: &mut Advertisement, clock: &Clock, ctx: &mut TxContext) {
        assert!(!check_active(advertisement, clock), EStillActive);
        let balance_value = balance::value(&advertisement.balance);
        let coin = coin::take(&mut advertisement.balance, balance_value, ctx);
        sui::transfer(coin, OWNER_ADDRESS);
    }
}