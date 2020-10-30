import { User } from '../../orm/entities/User';
import { Redeem } from '../../orm/entities/Redeem';
import { Command } from '../../orm/entities/Command';
/**
 * EntityTypes of all entities as string(lowercase) version
 */
export type EntityType = 'user' | 'redeem' | 'command';

/**
 * EntityClasses
 */
export type EntityClasses = User | Redeem | Command;
