import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { ExpenseTracker } from "../target/types/expense_tracker";
import { BN } from "bn.js";

describe("expense-tracker", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.local();

  let merchantName = "vikas";
  let amount = 100;
  let id = 1;

  let merchantName2 = "sakiv";
  let amount2 = 200;

  const program = anchor.workspace.expenseTracker as Program<ExpenseTracker>;
  let [expense_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("expense"),
      provider.wallet.publicKey.toBuffer(),
      new BN(id).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );

  it("Is initialized!", async () => {
    // Add your test here.
    // const tx = await program.methods.initialize().rpc();
    const tx = await program.methods
      .initialize(new anchor.BN(id), merchantName, new anchor.BN(amount))
      .accounts({
        authority: provider.wallet.publicKey,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Modify expense", async () => {
    const tx = await program.methods
      .modifyExpense(new anchor.BN(id), merchantName2, new anchor.BN(amount2))
      .accounts({
        expenseAccount: expense_account,
        authority: provider.wallet.publicKey,
      }).rpc();
      console.log("modify expense", tx)
  });

  it("Delete expense", async () => {
    const tx = await program.methods
      .deleteExpense(new anchor.BN(id))
      .accounts({
        expenseAccount: expense_account,
        authority: provider.wallet.publicKey,
      })
      .rpc();
      console.log("delete expense",tx)
  });
});
