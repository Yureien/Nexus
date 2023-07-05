module contract::pizzahouse {
    use std::string::{Self, String};
    use sui::object::{Self, ID, UID};
    use sui::event;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::sui::{Self, SUI};
    use sui::clock::{Self, Clock};

    // Objects
    struct OrderNFT has key, store {
        id: UID,
        placed_by: address,
        metadata: String,
        payment: Balance<SUI>,
        cancel_after: u64,
    }

    struct ContractData has key {
        id: UID,
        owner: address,
    }

    // Events
    struct OrderPlacedEvent has copy, drop {
        order_id: ID,
        placed_by: address,
        metadata: String,
    }

    struct OrderFinishedEvent has copy, drop {
        order_id: ID,
        placed_by: address,
        metadata: String,
    }

    struct OrderCancelledEvent has copy, drop {
        order_id: ID,
        placed_by: address,
        metadata: String,
    }

    // Constants
    const NFT_COST: u64 = 4 * 100000000; // Hardcoded with 0.4 SUI for 1 order, can be extended later
    const CANCEL_AFTER_MS: u64 = 1000 * 60 * 2; // 2 minutes, increase later

    // Error codes
    const EInsufficientFee: u64 = 0;
    const ENotOwner: u64 = 1;
    const EFeeDoesNotMatch: u64 = 2;
    const ECannotCancelYet: u64 = 3;

    // Init
    fun init(ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx);
        transfer::share_object(ContractData {
            id: object::new(ctx),
            owner: sender,
        })
    }

    // Entry Functions
    public entry fun place_order(
        metadata: vector<u8>,
        fee: Coin<SUI>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        assert!(coin::value(&fee) >= NFT_COST, EInsufficientFee);

        let sender = tx_context::sender(ctx);

        let order_nft = OrderNFT {
            id: object::new(ctx),
            placed_by: sender,
            metadata: string::utf8(metadata),
            payment: coin::into_balance(fee),
            cancel_after: clock::timestamp_ms(clock) + CANCEL_AFTER_MS,
        };

        event::emit(OrderPlacedEvent {
            order_id: object::id(&order_nft),
            placed_by: sender,
            metadata: order_nft.metadata,
        });

        transfer::transfer(order_nft, sender);
    }

    public entry fun cancel_order(
        order_nft: OrderNFT,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        assert!(clock::timestamp_ms(clock) >= order_nft.cancel_after, ECannotCancelYet);

        event::emit(OrderCancelledEvent {
            order_id: object::id(&order_nft),
            placed_by: order_nft.placed_by,
            metadata: order_nft.metadata,
        });

        let OrderNFT {
            payment,
            id,
            placed_by: _,
            metadata: _,
            cancel_after: _,
        } = order_nft;

        sui::transfer(coin::from_balance(payment, ctx), sender);
        object::delete(id);
    }

    public entry fun finish_order(
        contract_data: &ContractData,
        order_nft: OrderNFT,
        ctx: &mut TxContext
    ) {
        assert!(balance::value(&order_nft.payment) == NFT_COST, EFeeDoesNotMatch);

        event::emit(OrderFinishedEvent {
            order_id: object::id(&order_nft),
            placed_by: order_nft.placed_by,
            metadata: order_nft.metadata,
        });

        let OrderNFT {
            payment,
            id,
            placed_by: _,
            metadata: _,
            cancel_after: _,
        } = order_nft;
        sui::transfer(coin::from_balance(payment, ctx), contract_data.owner);

        object::delete(id);
    }
}