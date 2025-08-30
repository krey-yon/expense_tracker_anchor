use anchor_lang::prelude::*;

declare_id!("GDxPu92JyVHbcLwwoED3XuL6QNiXqZYxX7stXg7LZpTH");

#[program]
pub mod expense_tracker {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
